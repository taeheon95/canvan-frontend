import React from "react";
import axios, { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { Contact } from "../../types";
import ContactContainer from "./ContactContainer";
import Spinner from "../../components/Spinner";

function ContactPage() {
  const { data, isLoading, isError } = useQuery<Contact[], Error>(
    "Contact",
    async () => {
      const response: AxiosResponse<Contact[]> = await axios.get(
        "https://contact-server-taeheon.herokuapp.com/contacts"
      );
      return response.data;
    }
  );
  return isLoading ? (
    <Spinner />
  ) : isError ? (
    <div>에러</div>
  ) : (
    <ContactContainer data={data} />
  );
}

export default ContactPage;
