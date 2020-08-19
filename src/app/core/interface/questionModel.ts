export interface QuestionData {
  data: {
    count: number;
    pageCount: number;
    questions: QuestionModel[]
  };
}

export interface Answers {
  value: string;
  correct?: false;
  _id?: string;
}

export interface Tags {
  tag: string;
}

export interface Subject {
  label: string;
}

export interface Level {
  level: number;
}

export interface Groups {
  label: string;
}

export interface QuestionModel {
  subject: Subject;
  group: Groups[];
  level: Level;
  tags: Tags [];
  user_id: string;
  question: string;
  answers: Answers[];
  description?: string;
  _id?: string;
  lessons_id?: [string];
}
