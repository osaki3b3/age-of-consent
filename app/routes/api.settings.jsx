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

    return {checked: ( isModalEnabled.value == 'active' ) ? true : false };

};

  
export default function Index() {

    let settings = useLoaderData();

    return ( '{checked: '+settings.checked+'}' );

}
