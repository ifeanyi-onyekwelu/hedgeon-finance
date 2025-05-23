function formatNumberWithCommas(number: number) {
    return new Intl.NumberFormat('en-US').format(number);
}

export default formatNumberWithCommas;