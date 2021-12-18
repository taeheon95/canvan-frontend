import React, { useState } from "react";
import { Contact } from "../../types";
import ContactPresenter from "./ContactPresenter";

interface Props {
  data?: Contact[];
}

function ContactContainer(props: Props) {
  const { data } = props;
  const [contactList, setContactList] = useState<Contact[]>(() => {
    return data ? data : [];
  });
  return <ContactPresenter contactList={contactList} />;
}

export default ContactContainer;
