// import { authenticate } from "../shopify.server";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ request }) => {

    // await authenticate.admin(request);

    return {checked: true};

};

  
export default function Index() {

    let loader = useLoaderData();

    return ( '{checked: '+loader.checked+'}' );

}
