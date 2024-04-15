import { authenticate } from "../shopify.server";

    export const loader = async ({ request }) => {

    await authenticate.admin(request);

    return null;

};
  
  
export default function Index() {

    // let loader = useLoaderData();

    return ('test here');

}
