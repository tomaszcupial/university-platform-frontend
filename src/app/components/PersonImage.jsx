import clsx from "clsx"

const PersonImage = ({ firstName, lastName, className }) => {

    return (
        <div className={clsx("h-8 w-8 rounded-full bg-lime-200 flex justify-center items-center text-lime-700", className)}>
            {`${firstName.charAt(0)}${lastName[0]}`}
        </div>
    );
};

export default PersonImage;