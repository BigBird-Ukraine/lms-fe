export interface Answers {
  value: string;
  correct: false;
}

export interface Tags {
  tags: string;
}

export class QuestionModel {
  constructor(
    public subject: string,
    public group: string,
    public level: string,
    public tags: Tags [],
    public question: string,
    public answersForm: Answers []
  ) {
  }
}