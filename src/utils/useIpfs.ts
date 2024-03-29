import { ProjectData } from "components/types";

import Cryptojs from 'crypto-js';

export async function uploadProjectDataToIpfs(data : ProjectData){

  const projectData = structuredClone(data);
  const encryptionKey = process.env.ENCRYPTION_KEY || "default";
  projectData.editorState = Cryptojs.AES.encrypt(projectData.editorState, encryptionKey).toString();
  projectData.totalFundingGoal = projectData.rounds.reduce((n, {fundingGoal}) => n + fundingGoal, 0);
  projectData.totalRound = projectData.rounds.length;
  
  const projectNftData = {
    ...projectData, 
    'external_url' : "https://abstractstudiocomics.com/",
    'image': "https://ksr-ugc.imgix.net/assets/044/121/379/a20698426fe74952e050759555035f5a_original.jpg?ixlib=rb-4.1.0&crop=faces&w=560&h=315&fit=crop&v=1708835799&auto=format&frame=1&q=92&s=a8703ad1775a109c713a505202b69616"
  };
  
  const res = await fetch("/api/ipfs", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(projectNftData),
  });
  const resData = await res.json();

  const cid = resData.IpfsHash;

  return cid;
}