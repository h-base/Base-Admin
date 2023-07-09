/**
 * 拖拽指令
 * <div class="darg-wapper">
 * 	<div v-draggable class="drag-box">拖拽元素</div>
 * </div>
 */
import type { Directive } from "vue";
interface ElType extends HTMLElement {
	parentNode: any;
}
const draggable: Directive = {
	mounted: function (el: ElType) {
		el.style.cursor = "move";
		el.style.position = "absolute";
		el.onmousedown = function (e) {
			const disX = e.pageX - el.offsetLeft;
			const disY = e.pageY - el.offsetTop;
			document.onmousemove = function (e) {
				let x = e.pageX - disX;
				let y = e.pageY - disY;
				const maxX = el.parentNode.offsetWidth - el.offsetWidth;
				const maxY = el.parentNode.offsetHeight - el.offsetHeight;
				if (x < 0) {
					x = 0;
				} else if (x > maxX) {
					x = maxX;
				}

				if (y < 0) {
					y = 0;
				} else if (y > maxY) {
					y = maxY;
				}
				el.style.left = x + "px";
				el.style.top = y + "px";
			};
			document.onmouseup = function () {
				document.onmousemove = document.onmouseup = null;
			};
		};
	}
};
export default draggable;
