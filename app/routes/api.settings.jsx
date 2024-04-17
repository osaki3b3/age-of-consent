// import { authenticate } from "../shopify.server";
import { useLoaderData } from "@remix-run/react";
import { PrismaClient } from '@prisma/client';
import { json } from "@remix-run/node";
import { cors } from "remix-utils/cors";

export const loader = async ({ request }) => {

    const prisma = new PrismaClient();

    const isModalEnabled = await prisma.settings.findUnique({
        where:{
            id: 'EnabledCheckout18yoModal'
        }
    });

    const settings = {
        checked: false
    }

    if( isModalEnabled ){
        settings.checked = ( isModalEnabled.value == 'active' ) ? true : false
    }

    const response = json(settings);

    // return settings;

    return await cors( request, response );

};

  
// export default function Index() {

//     let settings = useLoaderData();

//     return ( JSON.parse( '{checked: '+settings.checked+'}' ) );

// }
