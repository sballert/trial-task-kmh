interface Customer {
  customerId: string;
  gender: "male" | "female" | "";
  givenName: string;
  surName: string;
  birthDate: string;
  isBusinessCustomer: boolean;
}

export default Customer;
