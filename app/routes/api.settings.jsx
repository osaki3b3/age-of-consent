// import { authenticate } from "../shopify.server";
import { useLoaderData } from "@remix-run/react";
import { PrismaClient } from '@prisma/client';

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

    // return settings;

    return json(settings);

};

  
// export default function Index() {

//     let settings = useLoaderData();

//     return ( JSON.parse( '{checked: '+settings.checked+'}' ) );

// }
