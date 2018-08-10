export interface User {
  success: boolean;
  message: string;
  data: {
    user: {
      user_id: number,
      fullname: string;
      token: string;
    },
    surveys: [object]
  };
}
