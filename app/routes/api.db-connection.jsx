// import { authenticate } from "../shopify.server";

import {
    Page
} from "@shopify/polaris";

import { useLoaderData } from "@remix-run/react";
import { PrismaClient } from '@prisma/client';

export const loader = async ({ request }) => {

    const prisma = new PrismaClient();

    let count = await prisma.settings.count();

    let settings = await prisma.settings.findUnique({
        where:{
            id: 'EnabledCheckout18yoModal'
        }
    });

    console.log('> db: ', count, settings);


    return count;
 
};

  
export default function Index() {

    const settings = useLoaderData();

    console.log( '> settings: ', settings )

    return ( 
        <Page>DB Connection</Page>
    );

}
