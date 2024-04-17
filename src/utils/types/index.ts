import React from 'react';

export type ProjectRound = {
  fundingGoal: bigint;
  endAt: number;
}

export type ProjectData = {
  name: string
  description: string,
  category: string,
  image: string | ArrayBuffer | null,
  external_url: string,
  totalFundingGoal: bigint
  totalRound: number
  rounds: ProjectRound[]
  editorState: string
  chatId?: string
}

export type FormProps = {
  projectData: ProjectData;
  setProjectData: React.Dispatch<React.SetStateAction<ProjectData>>;
}

export type ProjectMetaData = {
  name: string;
  description: string;
  category: 'all' | 'art' | 'comicts' | 'crafts' | 'dance' | 'design' | 'fashion' | 'file&design' | 'music';
  editorState: string;
  totalFundingGoal: bigint;
  totalRound: bigint;
  rounds: {
    fundingGoal: bigint;
    endAt: bigint;
  }[];
  image: string;
  external_url: string;
  chatId?: string
}

export type ProjectProps = {
  project: {
    name: string;
    metadata?: ProjectMetaData | null
    url?: string;
    totalFundingGoal: bigint;
    totalRound: bigint;
    currentRound: bigint;
    creator: `0x${string}`;
    status: number;
  },
  rounds: readonly {
    id: bigint;
    amountSentToCreator: bigint;
    collectedFund: bigint;
    fundingGoal: bigint;
    endAt: bigint;
  }[],
  backers: readonly `0x${string}`[]
}

export type Project = {
  id: number;
  name: string;
  url: string;
  totalFundingGoal: bigint;
  totalRound: bigint;
  currentRound: bigint;
  creator: `0x${string}`;
  status: number;
}

import { UserInfo } from "firebase/auth"
import { DocumentData } from "firebase/firestore"

export type chatProps = {
  id: string,
  scrollRef?: any,
}

export type chatModalProps = {
  type: "room" | "chat" | "addPeople",
  title: string
}

export type messageProps = {
  message: string,
  photoURL?: string,
  id: string
}

export type chatHeadertypes = {
  chatData: DocumentData,
  user: UserInfo
}

export type chatRoomProps = {
  data: DocumentData,
  id: string
}

export type singleChatProps = {
  users: string[],
  id: string
}

export type chatUserModalProps = {
  displayName: string
  photoURL: string | ArrayBuffer | null
}