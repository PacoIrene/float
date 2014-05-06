Frost.namespace("Frost.Columns");
var ySpaceRate = 20 / 300;
var xSpaceRate = 20 / 500;

function Columns(cfg) {
	this.columnList = [];
	Columns.superclass.constructor.apply(this, arguments);
}
Frost.extend(Columns, Frost.BaseChart);
Columns.prototype.render = function() {
	Columns.superclass.render.apply(this, arguments);
	var columnData = this.getData();
	var valueList = [];
	this._groupContainer = this._container.append("g");
	for(var i = 0; i != this.getSeries().length; i++) {
		valueList.push(this.getSeries()[i].name);
		var column = new Frost.Column({
			value: this.getSeries()[i].y,
			x: columnData[i].x,
			y: columnData[i].y,
			width: this.getSingleWidth(),
			height: this.getSingleHeight(this.getSeries()[i].y),
			color: this.getSeries()[i].color,
			name: this.getSeries()[i].name,
			container: this._groupContainer,
			parent: this
		});
		this.columnList.push(column.render());
	}
	this.bindUI();
	return this;
};
Columns.prototype.bindUI = function() {
	var columnList = this.columnList;
	this.getParent().getContainer().on("click", function() {
		for(var i = 0; i != columnList.length; i++) {
			if(columnList[i].isHighLight()) {
				columnList[i].deleteHighLight();
			}
		}
	});
};
Frost.Columns = Columns;