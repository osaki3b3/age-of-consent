import {
  Page,
  Layout,
  Text,
  Card,
  Button,
  BlockStack
} from "@shopify/polaris";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {

  await authenticate.admin(request);

  return null;
  
};


export default function Index() {

  return ( 

    <Page>

      
      <BlockStack gap="500">
        <Layout>
          <Layout.Section>
            <Card>
              
                <BlockStack gap="200">
                  <Text as="h3" variant="headingMd">
                  NYC AgeCheck Popup
                  </Text>
                  <Text as="p">
                  NYC AgeCheck Popup adds an age verification popup to your checkout page, ensuring all customers are over 18 in NY, in compliance with state regulations.
                  </Text>
                  <Text as="p" variant="bodyMd">
                    
                    <Button
                      url="/app/settings"
                    >
                      Go to settings
                    </Button>
                    
                  </Text>
                </BlockStack>
                
            </Card>
          </Layout.Section>
          
        </Layout>
      </BlockStack>
    </Page>
  );
}
