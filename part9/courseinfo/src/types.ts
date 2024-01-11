interface CoursePartBase {
  name: string;
  exerciseCount: number;
}
interface CoursePartDescriptionBase {
  name: string;
  description: string;
  exerciseCount: number;
}

interface CoursePartBasic extends CoursePartBase,CoursePartDescriptionBase {
  isDesc: true;
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CoursePartBase,CoursePartDescriptionBase {
  isDesc: true;
  backgroundMaterial: string;
  kind: "background";
}

interface CoursePartSpecial extends CoursePartBase,CoursePartDescriptionBase {
  isDesc: true;
  requirements: string[];
  kind: "special";
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;