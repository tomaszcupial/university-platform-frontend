import clsx from "clsx";

const PersonImage = ({ firstName, lastName, className }) => {
  return (
    <>
      {firstName && lastName ? (
        <div
          className={clsx(
            className,
            "rounded-full bg-lime-200 flex justify-center items-center text-lime-700 font-bold"
          )}
        >
          {firstName == lastName
            ? `${firstName.charAt(0)}`
            : `${firstName.charAt(0)}${lastName[0]}`}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default PersonImage;
