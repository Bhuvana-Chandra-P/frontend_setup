import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Web3 from 'web3';
import { CONTACT_ABI, CONTACT_ADDRESS, URL } from './config';

function App() {
	const [account, setAccount] = useState();
	const [contactList, setContactList] = useState();
	const [contacts, setContacts] = useState([]);

	useEffect(() => {
		async function load() {
			const web3 = new Web3(Web3.givenProvider || URL);
	    const accounts = await web3.eth.requestAccounts();
	    setAccount(accounts[0]);

	    const contactList = new web3.eth.Contract(CONTACT_ABI, CONTACT_ADDRESS);

	    setContactList(contactList);

	    const counter = await contactList.methods.count().call();

	    for (var i = 1; i <= counter; i++) {
	      const contact = await contactList.methods.contacts(i).call();
	      setContacts((contacts) => [...contacts, contact]);
	    }
		}

		load();
	}, []);

  return (
    <ChakraProvider theme={theme}>
      <p>hello</p>
    </ChakraProvider>
  );
}

export default App;

