<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.17.0/axios.js"></script>

<script defer src="https://use.fontawesome.com/releases/v5.0.6/js/all.js"></script>

<h1 style="margin-bottom: 40px;">Alert Setting Page</h1>

<div id="updateMessage" style=
"
display:none;
font-size: 16px;
padding: 15px 25px;
margin: 25px;
color: hsla(142, 45%, 36%, 1);
border: 1px solid hsla(142, 44%, 40%, 1);
background-color: hsla(150, 14%, 97%, 1);
">
  <i class="fa fa-check-circle"></i>  Alert setting is updated
</div>

<div id="loadIcon"><i class="fas fa-cog fa-spin fa-4x"></i></div>

<div id="errorMessage" style=
"
display:none;
font-size: 16px;
padding: 15px 25px;
margin: 25px;
color: hsla(9, 87%, 46%, 1);
border: 1px solid hsla(9, 87%, 46%, 1);
background-color: hsla(9, 15%, 97%, 1);
">
  <i class="fa fa-exclamation-triangle"></i>  Please check your device keys
</div>
<div id="pageBody" style="display:none;">
   <!-- js creates form dynamicaly here -->
</div>
<button id='btn' 
style="
display: inline-block;
background: #0085ba;
border-color: #0073aa #006799 #006799;
box-shadow: 0 1px 0 #006799;
color: #fff;
text-decoration: none;
text-shadow: 0 -1px 1px #006799, 1px 0 1px #006799, 0 1px 1px #006799, -1px 0 1px #006799;
padding: 6px 14px;
line-height: normal;
height: auto;
font-size: 14px;
cursor: pointer;
border-width: 1px;
border-style: solid;
-webkit-appearance: none;
border-radius: 3px;
white-space: nowrap;
box-sizing: border-box;
display: inline-block;
margin-top: 20px;
">Update</button>



