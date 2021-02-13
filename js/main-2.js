$(document).ready(function(){
	
	
	var name;
	var hotelStar;
	var roomType;
	var person;
	var days;
	var extraValues;
	var extraServices;
	var total;
	
	var pattern = {
		
		name: /^[a-zA-Z]+$/,
	}
	
	
	$('#myForm').submit(function(){
		
		name = $('#txtName').val();
		person = $('#txtNbPerson').val();
		days = $('#txtDuration').val();
		hotelStar = $('#cmbHotel').val();
		roomType = $('#cmbRoom').val();
		
		if(validateName(name, pattern.name)){
			if(validateHotel(hotelStar)){
				if(validateRoom(roomType)){
					if(validatePerson(person)){
						if(validateDays(days)){
							
							validateChkBox();
							displayBill();
							
						}
						
						
					}
				}
			}

		}
		
	})
	
	
	
	
	// Validating and reading Name
	function validateName(field, regEx){
		if(regEx.test(field)){
			
			$('#vName').text('');
			return true;
		}else{
			$('#vName').text('Please Enter Your Name');
			return false;
		}
	}
	
	//Validate hotel type
	function validateHotel(hotelStar){
		
		if(hotelStar == 'nostar' || hotelStar == ''){
			$('#vHotel').text('Select the hotel type!!!');
			return false;
		}else{
			$('#vHotel').text('');
			return true;
			
		}
		
	}
	
	//Validate room type
	function validateRoom(roomType){
		
		if(roomType == '' || roomType == null){
			$('#vRoom').text('Select the room type!!!');
			return false;
		}else{
			$('#vRoom').text('');
			return true;
			
		}
		
	}
	
	//Validate person
	function validatePerson(person){
		
		if(person == 1 || person == 2){
			$('#vNbPerson').text('');
			return true;
		}else{
			$('#vNbPerson').text('More than two persons not allowed!!!');
			return false;
			
		}
		
	}
	
	//Validate days
	function validateDays(days){
		
		if($.isNumeric(days)){
			$('#vDuration').text('');
			return true;
			
		}else{
			$('#vDuration').text('Enter a number !!!');
			return true;
			
		}
	}
	
	
	//Reading Checkbox
	function validateChkBox(){
		
		extraValues = new Array();
		extraServices = new Array();
		
		$('input[type="checkbox"]:checked').each(function(){
			
			extraValues.push($(this).val());
			if($(this).val() == 20){
				extraServices.push('City Bus Tour');
			}else if($(this).val() == 20){
				extraServices.push('Spa Massage');
			}else if($(this).val() == 200){
				extraServices.push('Hockey Ticket');
			}
		})
		
		
	}
	
	function calculateBill(){
		
		var extPrice = 0;
		for(let i =0; i < extraValues.length; i++ ){
			
			extPrice += parseFloat(extraValues[i]);
		}
		
		var subTotal = ((days * hotelStar * roomType) + extPrice).toFixed(2);
		var gst = (subTotal * 0.05).toFixed(2);
		var qst = (subTotal * 0.1).toFixed(2);
		var sum  = (parseFloat(subTotal) + parseFloat(gst) + parseFloat(qst)).toFixed(2);
		// console.log(subTotal);
		// console.log(gst);
		// console.log(qst);
		// console.log(sum);
		
		total = 'Sub-Total: '  + subTotal + '<br> GST: ' + gst + '<br> QST: ' + qst + '<br> Total: ' + sum;
		
	}
	
	function displayBill(){
		
		
		calculateBill();
		
		$('#billDisplay').css('visibility', 'visible');
		var data = 'Mr./Mrs. ' + name + '<br> You Booked for ' + person + ' persons, a ' + $('#cmbRoom option:selected').text() + ' for ' + days + ' Days<br> Extra: ' + extraServices + '<br>' + total;
		$('#content').html(data);
		
		
		
	}
	
	
})