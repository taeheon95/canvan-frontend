import React from "react";
import { Contact } from "../../types";

interface PropTypes {
  contactList: Contact[];
}

function ContactPresenter(props: PropTypes) {
  const { contactList } = props;
  return (
    <div>
      {contactList.map((contact) => (
        <div key={contact.id}>{contact.name}</div>
      ))}
    </div>
  );
}

export default ContactPresenter;
