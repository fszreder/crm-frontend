export type Client = {
    id: number;
    name: string;
    email: string;
    phone: string;
  };
  
  export const mockClients: Client[] = [
    {
      id: 1,
      name: "Jan Kowalski",
      email: "jan.kowalski@example.com",
      phone: "+48 600 100 200",
    },
    {
      id: 2,
      name: "Anna Nowak",
      email: "anna.nowak@example.com",
      phone: "+48 500 200 300",
    },
    {
      id: 3,
      name: "Michał Wiśniewski",
      email: "michal@example.com",
      phone: "+48 512 333 444",
    },
  ];
  