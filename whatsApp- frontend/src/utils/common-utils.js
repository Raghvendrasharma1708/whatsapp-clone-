

export const formatDate = (date) => {
    const houres = new Date(date).getHours();
    const minutes = new Date(date).getMinutes();
    const ampm = houres >= 12 ? 'PM' : 'AM';
    return `${houres < 10 ? "0" + houres : houres} : ${minutes < 10 ? '0' + minutes : minutes} ${ampm}`

}


