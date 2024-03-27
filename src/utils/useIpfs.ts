import { ProjectData } from "components/types";

import Cryptojs from 'crypto-js';

export async function uploadProjectDataToIpfs(projectData : ProjectData){

  const encryptionKey = process.env.ENCRYPTION_KEY || "default";
  console.log(encryptionKey);
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
  const resData = await res.json();

  const cid = resData.IpfsHash;

  return cid;
}