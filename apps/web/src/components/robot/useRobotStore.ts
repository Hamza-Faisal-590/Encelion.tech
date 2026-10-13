import { create } from 'zustand';

export type RobotState = 'IDLE' | 'LISTENING' | 'THINKING' | 'SPEAKING' | 'GESTURING';

interface RobotStore {
  state: RobotState;
  setState: (state: RobotState) => void;
  audioAmplitude: number;
  setAudioAmplitude: (amp: number) => void;
  headFollowCursor: boolean;
  setHeadFollowCursor: (follow: boolean) => void;
}

export const useRobotStore = create<RobotStore>((set) => ({
  state: 'IDLE',
  setState: (state) => set({ state }),
  audioAmplitude: 0,
  setAudioAmplitude: (audioAmplitude) => set({ audioAmplitude }),
  headFollowCursor: true,
  setHeadFollowCursor: (headFollowCursor) => set({ headFollowCursor }),
}));
