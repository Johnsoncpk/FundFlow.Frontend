import { initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { NextApiRequest, NextApiResponse } from "next";

export default async function POST(request: NextApiRequest, response: NextApiResponse) {
  try {
    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_MESSSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_APP_ID,
    };
    initializeApp(firebaseConfig)

    const address = await request.body;
    const res = await getAuth().createCustomToken(
      address, 
      { 
        address: address
      });
    response.status(200).json({ customToken: res })
  } catch (e) {
    console.log(e)
    response.status(500).json(
      { error: e },
    );
  }
}
