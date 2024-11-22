import { CircleX } from "lucide-react";

export default function ShowErrors({ errors }) {

    return (
        <div className="flex flex-col justify-start items-start gap-2">
            {
                errors.length > 0
                    ? errors.map((error, idx) => (
                        <small key={idx} className="text-sm font-medium leading-none text-red-500 flex flex-row justify-start items-center">
                            <CircleX className="mr-2 h-5 w-5" />
                            {error}
                        </small>
                    ))
                    : <></>
            }
        </div>
    );
}