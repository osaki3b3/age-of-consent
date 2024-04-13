import { json } from "@remix-run/node";
import { boundary } from "@shopify/shopify-app-remix/server";

import { authenticate } from "../shopify.server";

// import { useLoaderData } from '@remix-run/react';

// import db from "../db.server";


export async function loader( { request } ){

    await authenticate.admin(request);

    // let settings = await db.settings.findUnique({
    //     where:{
    //         id: 'EnabledCheckout18yoModal'
    //     }
    // });

    // return json( { checked: ( settings.value == 'active' ? true : false ) } );
    return json( { checked: true } );

}

export async function action( { request  } ){

    return new Response("Method now allowed.", {status: 405});
    
}

// Shopify needs Remix to catch some thrown responses, so that their headers are included in the response.
export function ErrorBoundary() {
    return boundary.error(useRouteError());
}

export const headers = (headersArgs) => {
    return boundary.headers(headersArgs);
};
  