interface Meeting {
  meetingId: number;
  meetingName: string;
  information: string;
  maxPeople: number;
  curPeople: number;
  status: string;
  createdAt: string;
}

interface ApiResponse {
  data: Meeting;
  msg: string;
}
