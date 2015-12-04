﻿//Disable all expressions on a layer#script "Enable Disable Expressions";var switchExpressions = this;AVLayer.prototype.disableExpression = function(activate, removeExpr){    var enableDisableExpressions = function(_prop, activate, removeExpr){        for(var i=1; i<=_prop.numProperties; i++){            var curProp=_prop.property(i);            if(curProp instanceof PropertyGroup || curProp instanceof MaskPropertyGroup){                enableDisableExpressions(curProp, activate, removeExpr);            }            else if (curProp.canSetExpression == true){                try{                    if(curProp.expressionEnabled == true && activate == false){                        curProp.expressionEnabled = false;//выкл                    }                    if(curProp.expressionEnabled == false && activate == true){                        curProp.expressionEnabled = true;//вкл                    }                                        if(removeExpr) curProp.expression = '';                }                catch(err){ null }            }        }    }    enableDisableExpressions(this, activate, removeExpr);}TextLayer.prototype.disableExpression = function(activate, removeExpr){    var enableDisableExpressions = function(_prop, activate, removeExpr){        for(var i=1; i<=_prop.numProperties; i++){            var curProp=_prop.property(i);            if(curProp instanceof PropertyGroup || curProp instanceof MaskPropertyGroup){                enableDisableExpressions(curProp, activate, removeExpr);            }            else if (curProp.canSetExpression == true){                try{                    if(curProp.expressionEnabled == true && activate == false){                        curProp.expressionEnabled = false;//выкл                    }                    if(curProp.expressionEnabled == false && activate == true){                        curProp.expressionEnabled = true;//вкл                    }                                        if(removeExpr) curProp.expression = '';                }                catch(err){ null }            }        }    }    enableDisableExpressions(this, activate, removeExpr);}ShapeLayer.prototype.disableExpression = function(activate, removeExpr){    var enableDisableExpressions = function(_prop, activate, removeExpr){        for(var i=1; i <= _prop.numProperties; i++){            var curProp=_prop.property(i);            if(curProp instanceof PropertyGroup || curProp instanceof MaskPropertyGroup){                enableDisableExpressions(curProp, activate, removeExpr);            }            else if (curProp.canSetExpression == true){                try{                    if(curProp.expressionEnabled == true && activate == false){                        curProp.expressionEnabled = false;//выкл                    }                    if(curProp.expressionEnabled == false && activate == true){                        curProp.expressionEnabled = true;//вкл                    }                                        if(removeExpr) curProp.expression = '';                }                catch(err){ null } //кароч не хочу искать причину этой ошибки            }        }    }    enableDisableExpressions(this, activate, removeExpr);}switchExpressions.go = function(activate, removeExpr){    var activeComp = app.project.activeItem;    if(activeComp && activeComp instanceof CompItem){        var sel = activeComp.selectedLayers;        if(sel.length > 0){            for(var s = 0; s < sel.length; s++){                // $.writeln(sel[s].name)                sel[s].disableExpression(activate, removeExpr);            }        }        else{              for(var s = 1; s <= activeComp.layers.length; s++){                activeComp.layers[s].disableExpression(activate, removeExpr);            }         }    }    else alert("Select at least one layer");}switchExpressions.buildGUI = function(thisObj){    //building main GUI    thisObj.w = (thisObj instanceof Panel) ? thisObj : new Window("palette", "expr on|off", undefined, {resizeable:true});    thisObj.w.alignChildren = ['left', 'top']    var g = thisObj.w.add("group{orientation:'Column', alignChildren: ['left', 'top']}");    g.preferredSize = [120,80];    var disableBttn = g.add('button', undefined, "Disable Expressions");    disableBttn.size = [120, 20];    var enableBttn = g.add('button', undefined, "Enable Expressions");    enableBttn.size = [120, 20];    var removeBttn = g.add('button', undefined, "Remove Expressions");    removeBttn.size = [120, 20];    disableBttn.onClick = function(){        app.beginUndoGroup("Disable Expressions");        switchExpressions.go(false, false);        app.endUndoGroup();    }    enableBttn.onClick = function(){        app.beginUndoGroup("Enable Expressions");        switchExpressions.go(true, false);        app.endUndoGroup();    }    removeBttn.onClick = function(){        app.beginUndoGroup("Remove Expressions");        switchExpressions.go(false, true);        app.endUndoGroup();    }    if (thisObj.w instanceof Window){        thisObj.w.center();        thisObj.w.show();    }    else thisObj.w.layout.layout(true);}switchExpressions.buildGUI(switchExpressions);