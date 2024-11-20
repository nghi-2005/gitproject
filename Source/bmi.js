<script>
    let weight= parseInt(prompt('Nhap can nang'))
    let height= parseInt(prompt("nhap chieu cap"))
    let bmi= weight / (height^2)
    if (bmi<18.5){
    alert("Underweight")
}else if (18.5<=bmi<25){
    alert('nomal')
}else if (25.0<=bmi<30.0){
    alert('Overweight')
}else {
    alert('obese')
}

</script>