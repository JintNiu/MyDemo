<template>
  	<div style="width:100%;height:100%" class="lds-double-ring">
	    <div></div>
	    <div></div>
  	</div>
</template>
<style scoped>
	@keyframes lds-double-ring {
  0% {
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-webkit-keyframes lds-double-ring {
  0% {
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes lds-double-ring_reverse {
  0% {
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(-360deg);
    transform: rotate(-360deg);
  }
}
@-webkit-keyframes lds-double-ring_reverse {
  0% {
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(-360deg);
    transform: rotate(-360deg);
  }
}
.lds-double-ring {
  position: relative;
}
.lds-double-ring div {
  position: absolute;
  width: 144px;
  height: 144px;
  top: 28px;
  left: 28px;
  border-radius: 50%;
  border: 12px solid #000;
  border-color: #ed8422 transparent #ed8422 transparent;
  -webkit-animation: lds-double-ring 1s linear infinite;
  animation: lds-double-ring 1s linear infinite;
}
.lds-double-ring div:nth-child(2) {
  width: 116px;
  height: 116px;
  top: 42px;
  left: 42px;
  border-color: transparent #f5bb16 transparent #f5bb16;
  -webkit-animation: lds-double-ring_reverse 1s linear infinite;
  animation: lds-double-ring_reverse 1s linear infinite;
}
.lds-double-ring {
  width: 100px !important;
  height: 100px !important;
  -webkit-transform: translate(-50px, -50px) scale(0.5) translate(50px, 50px);
  transform: translate(-50px, -50px) scale(0.5) translate(50px, 50px);
}
</style>