import math
import string
import json
import decimal
import rhinoscriptsyntax as rs

# Returns polyline coordinates, assuming it is closed.
#   (last coordinate is deleted)
def get_closed_polyline_coordinates(polyline):
	coordinates = []
	pts = rs.CurvePoints(polyline)
	for pt in pts:
		x = float('%.4f' % pt[0])
		y = float('%.4f' % pt[1])
		coordinates.append([ x, y ])
	del coordinates[-1]
	return coordinates

def get_rooms(base_layer):
	rooms = []
	layer_name = base_layer + '::rooms'
	geometry = rs.ObjectsByLayer(layer_name)
	for item in geometry:
		room = {
			'name': rs.ObjectName(item),
			'coordinates': get_closed_polyline_coordinates(item)
		}
		rooms.append(room)
	return rooms

def get_balcony_coordinates(base_layer):
	layer_name = base_layer + '::balcony'
	if rs.IsLayer(layer_name):
		balcony = rs.ObjectsByLayer(layer_name)[0]
		return get_closed_polyline_coordinates(balcony)

# Get outer wall coordinates for a base layer.
def get_outer_wall_coordinates(base_layer):
	layer_name = base_layer + '::outer_wall'
	outer_wall = rs.ObjectsByLayer(layer_name)[0]
	return get_closed_polyline_coordinates(outer_wall)

# Get a single floor.
def get_floor(base_layer):
	return {
		"name": base_layer,
		"outer_wall_coordinates": get_outer_wall_coordinates(base_layer),
		"balcony_coordinates": get_balcony_coordinates(base_layer),
		"rooms": get_rooms(base_layer)
	}

# Get all floors.
def get_floors(base_layers):
	res = []
	for base_layer in base_layers:
		res.append(get_floor(base_layer))
	return res

# Write a file in the folder of the current model.
#   - file_name includes extension.
def write_file(file_name, content):
	path = rs.DocumentPath()
	name = rs.DocumentName()
	path = path + "/" + file_name
	f = open(path, "w")
	f.write(content)
	f.close()

def Main():
	write_file('exp.json', json.dumps(get_floors([ 'dc_08', 'dc_09', 'dc_10', 'dc_11' ])))

Main()