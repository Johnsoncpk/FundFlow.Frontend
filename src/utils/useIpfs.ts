import { ProjectData } from "components/types";

import Cryptojs from 'crypto-js';

export async function uploadProjectDataToIpfs(data : ProjectData){

  const projectData = structuredClone(data);
  const encryptionKey = process.env.ENCRYPTION_KEY || "default";
  projectData.editorState = Cryptojs.AES.encrypt(projectData.editorState, encryptionKey).toString();
  projectData.totalFundingGoal = projectData.rounds.reduce((n, {fundingGoal}) => n + fundingGoal, 0);
  projectData.totalRound = projectData.rounds.length;
  
  const res = await fetch("/api/ipfs", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(projectData),
  });

  const { ipfsHash} = await res.json();
  return ipfsHash;
}