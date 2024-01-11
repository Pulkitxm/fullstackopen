import { CoursePart } from "../types";
const Part = ({ part }: { part: CoursePart }): JSX.Element => {
    const assertNever = (value: never): never => {
        throw new Error(
            `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    };
    let descComponent: JSX.Element = <></>;
    if (part.kind == 'group') {
        descComponent = <>
            <i>project exercises {part.groupProjectCount}</i>
        </>
    } else {
        switch (part.kind) {
            case "basic":
                descComponent = <i>{part.description}</i>
                break;
            case "background":
                descComponent = <>
                    <i>{part.description}</i>
                    <br />
                    Submit to: {part.backgroundMaterial}
                </>
                break;
            case "special":
                descComponent = <>
                    <i>{part.description}</i>
                    <br />
                    required skills: {part.requirements.reduce((a, b) => a + ", " + b)}
                </>
                break;
            default:
                return assertNever(part);
        }
    }
    return (
        <div style={{
            margin: "0.7em 0"
        }}>
            <b>{part.name} {part.exerciseCount}</b>
            <br />
            {descComponent}
        </div>
    )
}
export default Part