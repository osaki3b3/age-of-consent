import {
  Banner,
  useTranslate,

  useApi, 
  useAppMetafields,

  reactExtension,
  Checkbox,
  useApplyAttributeChange,
  useShippingAddress,

  useExtensionCapability,
  useBuyerJourneyIntercept,

  InlineStack,
  InlineSpacer,
  View,
  Heading,
  Modal,
  BlockLayout,
  TextBlock,
  Text,
  Button,
  Link,
  Pressable

} from '@shopify/ui-extensions-react/checkout';

import React, { useState, useEffect } from 'react';

export default reactExtension(
  'purchase.checkout.delivery-address.render-after',
  () => <Extension />,
);

function Extension() {

  const applyAttributeChange = useApplyAttributeChange();

  const {ui} = useApi();



  const [isChecked, setIsChecked] = useState(false);
  const [isEnabledInSettings, setIsEnabledInSettings] = useState(false);
  const [isModalRejected, setIsModalRejected] = useState(false);

  const [validationError, setValidationError] = useState("");
  const canBlockProgress = useExtensionCapability("block_progress");

  const { provinceCode } = useShippingAddress();

  useEffect(function(){

    const domain = 'https://sea-lion-app-t26u5.ondigitalocean.app/';
    fetch(
      `${domain}/api/settings`,
      {
        method: 'GET',
        headers: {
          "Content-Type": "application.json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
        }
      }
    )
    .then( response => response.json() )
    .then( data => {
      
    });

    setIsEnabledInSettings( isEnabledInSettings => isEnabledInSettings = true )
    
  })

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
      applyAttributeChange({
        key: 'requestedFreeGift',
        type: 'updateAttribute',
        value: isChecked ? true : false,
      });
    setValidationError("");
  };

  useBuyerJourneyIntercept(({ canBlockProgress }) => {

    if ( canBlockProgress && !isChecked && provinceCode == 'NY' && isEnabledInSettings ) {

      return {

        behavior: "block",
        reason: "Please confirm that you are 18+ years old",

        perform: (result) => {
          if (result.behavior === "block") {
            setValidationError("Please confirm that you are 18+ years old");
          }
        },

      };
    }
        
    return {
      behavior: "allow",
      perform: () => {
        clearValidationErrors();
      },
    };
  });

  function clearValidationErrors() {
    setValidationError("");
  ``}



  
  const Modal18yoContent = function(){   

    if( !isModalRejected ){
      return (
        <BlockLayout spacing='base' padding='base'>
          

            <View>
              <TextBlock inlineAlignment='center'>
                <Text size='medium'>
                  To purchase these supplements in New York, we must verify your age. Are you over 18 years old?
                </Text>
                <Text>

                </Text>
              </TextBlock>
            </View>


            <InlineStack inlineAlignment='center'>
              <View>
                <Button
                  appearance=''
                  onPress={() => {
                      ui.overlay.close('modal-18yo');
                      setIsChecked( isChecked => isChecked = true);
                    } 
                  }
                >
                  Yes
                </Button>
              
                <InlineSpacer spacing="base" />

                <Button 
                  appearance='critical'
                  onPress={
                    () => {
                      setIsChecked( isChecked => isChecked = false);
                      setIsModalRejected( isModalRejected => isModalRejected = true );
                    }
                  }
                >
                  No
                </Button>
              </View>
            </InlineStack>
            

          
        </BlockLayout>
      )
    }else{
      return (
        <BlockLayout  spacing='base' padding='base'>

          <View>
            <TextBlock inlineAlignment='center'>
              <Text size='medium'>
              You need to be over the age of 18 to purchase these supplements in NY
              </Text>
            </TextBlock>
          </View>

          <InlineStack inlineAlignment='center'>
            <View>
              <Button
                onPress={
                  () => {
                    ui.overlay.close('modal-18yo');
                  }
                }
              >
                Close
              </Button>
            </View>
          </InlineStack>

        </BlockLayout>
      )
    }
    
    
  }
    

  if( provinceCode == 'NY' && isEnabledInSettings ){

    console.log( '> ui: ', ui );


    return (
      
      <BlockLayout >
        
        

        

        <Pressable
          appearance='accent'
          overlay={ 
            <Modal
              id="modal-18yo"
              padding
              style={{ textDecoration: 'none' }}
            >
              <Heading inlineAlignment='center' level="1">Verify Your Age</Heading>
              <Modal18yoContent />
            </Modal> 
          } 
          onPress={
            () => {
              setIsModalRejected( isModalRejected => isModalRejected = false );
            }
          }
        >

          <Checkbox 
            value={isChecked}
            onChange={handleCheckboxChange}
            onInput={clearValidationErrors}
            required={canBlockProgress}
            error={validationError}
          >By selecting this box, you confirm that you are over 18 years old</Checkbox>

        </Pressable>
        

      </BlockLayout>
    )


  }


}