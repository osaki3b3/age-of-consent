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

    if( typeof isModalEnabled.value != null ){
        settings.checked = ( isModalEnabled.value == 'active' ) ? true : false
    }

    return settings;

};

  
export default function Index() {

    let settings = useLoaderData();

    return ( '{checked: '+settings.checked+'}' );

}
