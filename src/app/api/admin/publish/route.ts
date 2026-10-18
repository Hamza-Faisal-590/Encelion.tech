import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
export const runtime = 'nodejs';

export async function GET() {
  try {
    const { stdout: statusOut } = await execAsync('git status --porcelain', {
      cwd: process.cwd(),
    });

    const changedFiles = statusOut
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean);

    return NextResponse.json({
      success: true,
      hasChanges: changedFiles.length > 0,
      changedFiles,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error?.message || 'Failed to check git status',
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const message = (body.commitMessage || 'Update website content from admin dashboard').trim();

    // 1. Check git status
    const { stdout: statusOut } = await execAsync('git status --porcelain', {
      cwd: process.cwd(),
    });

    const hasChanges = statusOut.trim().length > 0;

    if (!hasChanges) {
      return NextResponse.json({
        success: true,
        alreadyUpToDate: true,
        message: 'All content is already up to date with your git repository. No new changes to push.',
      });
    }

    // 2. Stage changes
    await execAsync('git add .', { cwd: process.cwd() });

    // 3. Commit
    const safeMsg = message.replace(/"/g, '\\"');
    await execAsync(`git commit -m "${safeMsg}"`, { cwd: process.cwd() });

    // 4. Push to remote
    const { stdout: pushOut, stderr: pushErr } = await execAsync('git push origin main', {
      cwd: process.cwd(),
      timeout: 30000,
    });

    return NextResponse.json({
      success: true,
      message: 'Website content successfully committed and pushed to GitHub main branch! Live site will update in 1-2 minutes.',
      details: pushOut || pushErr,
    });
  } catch (error: any) {
    console.error('Publish error:', error);

    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Failed to push to GitHub automatically.',
        fallbackCommand: 'git add . && git commit -m "Update website content" && git push origin main',
        message:
          'Changes were saved to your code files. To push to GitHub, run the command in your terminal.',
      },
      { status: 200 }
    );
  }
}
