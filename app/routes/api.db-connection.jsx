// import { authenticate } from "../shopify.server";

import {
    Page
} from "@shopify/polaris";

import { useLoaderData } from "@remix-run/react";
import { PrismaClient } from '@prisma/client';

export const loader = async ({ request }) => {

    const prisma = new PrismaClient();

    // await authenticate.admin(request);

    return null;

};

  
export default function Index() {

    const settings = useLoaderData();

    return ( 
        <Page>
            Init
        </Page>
    );

}
