interface SampleData {
  avatar: string[];
  name: string;
  _id: string;
  groupChat: boolean;
  newMessageAlert: boolean;
  members: string[];
}

export const sampleData: SampleData[] = [
  {
    avatar: ["https://www.w3school.com/howto/img_avatar.png"],
    name: "John Doe",
    _id: "1",
    groupChat: false,
    newMessageAlert: false,
    members: ["1", "2", "4"],
  },
  {
    avatar: ["https://www.w3school.com/howto/img_avatar.png"],
    name: "Chacha John",
    _id: "2",
    groupChat: false,
    newMessageAlert: false,
    members: ["1", "2", "4"],
  },
];

export const sampleUsers = [
  {
    avatar: "https://www.w3school.com/howto/img_avatar.png",
    name: "John Doe",
    _id: "1",
  },
  {
    avatar: "https://www.w3school.com/howto/img_avatar.png",
    name: "John Doe",
    _id: "2",
  },
];

export const sampleNotification = [
    {
      sender: {
        avatar: "",
        name: "John Doe"
      },
      _id: "1",
    },
    {
        sender: {
            avatar: "",
            name: "John Doe"
          },
      _id: "2",
    },
];

export const sampleMessage = [
  {
    attachments: [
      {
        public_id: "asdasa",
        url: "https://www.w3schools.com/howto/img_avatar.png"
      }
    ],
    content: "Hii kya kar rha hai",
    _id: "sdf34-ffg44-vvmf45-fgmm6",
    sender: {
      _id: "user._id",
      name: "chhedi",
    },
    chat: "chatId",
    createdAt: "2025-02-23T19:15:45.000Z"
  },
  {
    attachments: [
      {
        public_id: "asdasa",
        url: "https://www.w3schools.com/howto/img_avatar.png"
      }
    ],
    content: "badiya tu bata",
    _id: "sdf34-ffg44-45-fgmm6",
    sender: {
      _id: "asds45-43ffd-54fhf",
      name: "chhedi",
    },
    chat: "chatId",
    createdAt: "2025-02-23T19:15:45.000Z"
  }
];