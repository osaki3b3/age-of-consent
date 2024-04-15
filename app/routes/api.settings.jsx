// import { authenticate } from "../shopify.server";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ request }) => {

    const prisma = new PrismaClient();

    let isModalEnabled = await prisma.settings.findUnique({
        where:{
            id: 'EnabledCheckout18yoModal'
        }
    });

    return {checked: ( isModalEnabled ) ? isModalEnabled : 'false', };

};

  
export default function Index() {

    let settings = useLoaderData();

    return ( '{checked: '+settings.checked+'}' );

}
