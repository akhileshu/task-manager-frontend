// for setValue of form -edit
export function formatDateForInput(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed, so we add 1
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  // Format the date and time as "YYYY-MM-DDTHH:mm"
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

// format dateString for displaying , returns obj
export function formatDateAndTime(dateString) {
  const date = new Date(dateString);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? "pm" : "am";

  const formattedDateAndTime = `Date: ${day} ${month} ${year} Time: ${
    hours % 12 || 12
  }:${minutes.toString().padStart(2, "0")} ${period}`;
  // console.log(formattedDateAndTime)
  // return {
  //   DateAndTime: formattedDateAndTime
  // };
  return {
    date: `${day} ${month} ${year}`,
    time: `${hours % 12 || 12}:${minutes
      .toString()
      .padStart(2, "0")} ${period}`,
  };
}

// currently doing  task on backend
// to convert Input date-time to js date string

