export interface Answers {
  label: string;
  valid: false;
}

export interface Tags {
  tags: Tags;
}

export class QuestionModel {
  constructor(
    public subject: string,
    public group: string,
    public level: string,
    public tags: Tags,
    public question: string,
    public answersForm: Answers
  ) {
  }
}
