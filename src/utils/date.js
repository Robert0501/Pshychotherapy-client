export default function convertStringToDate(string)  {
    const date = new Date(string);
    const formattedDate = date.toLocaleDateString("ro-RO", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    }).trim();


    return formattedDate
}
