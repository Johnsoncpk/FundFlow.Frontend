import { ProjectData } from "components/types";
import { NextApiRequest, NextApiResponse } from "next";

export default async function POST(request: NextApiRequest, response: NextApiResponse) {
  try {
    const data = await request.body as ProjectData;

    const ipfsData = new FormData();
    const blob = new Blob([JSON.stringify(data)], {type : 'application/json'})
    ipfsData.append('file', blob, `${data.name}${new Date().toJSON()}.json`)
  
    const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PINATA_JWT}`,
      },
      body: ipfsData,
    });
    
    const rese = await res.json();
    response.status(200).json({ ipfsHash: rese.IpfsHash })    
  } catch (e) {
    console.log(e);
    response.status(500).json(
      { error: "Internal Server Error" },
    );
  }
}
