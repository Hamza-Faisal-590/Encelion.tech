import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { AgentsModule } from './modules/agents/agents.module';
import { RagModule } from './modules/rag/rag.module';
import { LeadsModule } from './modules/leads/leads.module';
import { VoiceModule } from './modules/voice/voice.module';
import { WorkflowsModule } from './modules/workflows/workflows.module';
import { VisionModule } from './modules/vision/vision.module';
import { BillingModule } from './modules/billing/billing.module';
import { AdminModule } from './modules/admin/admin.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    AgentsModule,
    RagModule,
    LeadsModule,
    VoiceModule,
    WorkflowsModule,
    VisionModule,
    BillingModule,
    AdminModule,
    AnalyticsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
