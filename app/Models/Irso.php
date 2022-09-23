<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Irso extends Model
{
    use HasFactory;

     /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'irsos';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        
    ];

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'id';

     /**
     * The relationships that should always be loaded.
     *
     * @var array
     */
    protected $with = ['subunidade', 'usuarios'];    

    public function subunidade()
    {
        return $this->belongsTo(Subunidade::class);
    }

    public function usuarios()
    {
         return $this->belongsToMany(User::class, 'irsos_users')->withPivot('id', 'atrasado', 'ausente', 'atestado');
        //return $this->hasMany(IrsoUser::class, 'irso_id');
    }
}
