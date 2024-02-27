export interface CoursePartBase {
	name: string;
	exerciseCount: number;
}

export interface Description extends CoursePartBase {
	description: string;
}

export interface CoursePartBasic extends Description {
	kind: 'basic';
}

export interface CoursePartGroup extends CoursePartBase {
	groupProjectCount: number;
	kind: 'group';
}
export interface CoursePartBackground extends Description {
	backgroundMaterial: string;
	kind: 'background';
}

export interface CoursePartSpecial extends Description {
	requirements: string[];
	kind: 'special';
}

export interface CoursePartTest extends Description {
	test: string;
	kind: 'test';
}

export type Anything = unknown;

export type CoursePart =
	| CoursePartBasic
	| CoursePartGroup
	| CoursePartBackground
	| CoursePartSpecial
	| CoursePartTest;
