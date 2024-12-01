import Component from "@/clients/view-plant"

export async function generateMetadata({ params }) {
    let title = "Plant Info"; // Default title if no match is found

    return {
        title: title,
    }
}

export default function ViewPlant({ params }) {
    console.log(params);
    return (
        <Component />
    )
}
