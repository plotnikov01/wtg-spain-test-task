import dayjs from "dayjs";

export const generateDate = (
	month = dayjs().month(),
	year = dayjs().year()

) => {
	// Get the first and last dates of the specified month and year
	const firstDateOfMonth = dayjs().year(year).month(month).startOf("month");
	const lastDateOfMonth = dayjs().year(year).month(month).endOf("month");

	// Initialize an empty array to hold the generated dates
	const arrayOfDate = [];

	// Generate dates for days preceding the first day of the month
	for (let i = 0; i < firstDateOfMonth.day(); i++) {
		const date = firstDateOfMonth.day(i);

		arrayOfDate.push({
			currentMonth: false, // Indicates that this date is not in the current month
			date,
		});
	}

	// Generate dates for the current month
	for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
		arrayOfDate.push({
			currentMonth: true, // Indicates that this date is in the current month
			date: firstDateOfMonth.date(i),
			today:
				firstDateOfMonth.date(i).toDate().toDateString() ===
				dayjs().toDate().toDateString(),
		});
	}

	// Generate dates for days following the last day of the month to fill the remaining slots in a 6-week grid
	const remaining = 42 - arrayOfDate.length; // 42 = date slots/page

	for (
		let i = lastDateOfMonth.date() + 1;
		i <= lastDateOfMonth.date() + remaining;
		i++
	) {
		arrayOfDate.push({
			currentMonth: false, // Indicates that this date is not in the current month
			date: lastDateOfMonth.date(i),
		});
	}
	return arrayOfDate;
};

export const months = [
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
