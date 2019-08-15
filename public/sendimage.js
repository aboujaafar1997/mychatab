var socket = io.connect('https://mychatab.herokuapp.com/');
var output=document.getElementById('output');
var nom=document.getElementById('nom');

                            let btnSubmit = document.querySelector('#add');
                            btnSubmit.addEventListener('click', async(event) => {
                                event.preventDefault();
                                $('.loading').fadeIn();
                                let image = document.querySelector('#image');
                                let formData = new FormData();
                                formData.append('image', image.files[0]);
                                formData.append('nom', nom.value);

                                let options = {
                                    method: 'POST',
                                    headers: {
                                        'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                                        'Content-Type': 'multipart/form-data'
                                    }
                                }

                                let response = await fetch('/add', {
                                    method: 'POST',
                                    options,
                                    body: formData
                                });
                                let resultat = await response.json();
                                console.log(resultat);
                                $('.loading').fadeOut();
                                

                             
                            });
                          